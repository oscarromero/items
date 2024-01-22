import { useState } from "react";
import useNotification from "@/components/ui/notification/useNotification";
import useDialog from "@/components/ui/notification/useDialog";
import { getItems, searchItems, saveItem, deleteItem } from "@/components/services/api";

const useItemOverview = () => {
  const columns = [
    { id: "id", label: "ID" },
    { id: "description", label: "Descripción" },
  ];

  const [data, setData] = useState([]);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [
    notification,
    closeNotification,
    successNotification,
    errorNotification,
  ] = useNotification();
  const [
    deleteDialogOpen,
    deleteDialogLoadingState,
    deleteDialogLoading,
    openDeleteDialog,
    closeDeleteDialog,
  ] = useDialog();
  const [
    itemFormOpen,
    itemFormLoadingState,
    itemFormLoading,
    openItemForm,
    closeItemForm,
  ] = useDialog();

  const fetchData = async (description) => {
    let items;
    if (description) {
      items = await searchItems(description);
    } else {
      items = await getItems();
    }
    setData(items);
    setItemsLoaded(true);
  };

  const handleItemSelected = (item) => {
    setCurrentItem(item ? item : {});
  };

  const handleReloadItems = () => {
    window.location = '/items';
  };

  const handleNewItem = () => {
    setCurrentItem({ id: 0, description: "" });
    openItemForm();
  };

  const handleEditItem = () => {
    openItemForm();
  };

  const handleFormChange = (e) => {
    setCurrentItem({ ...currentItem, description: e.target.value });
  };

  const handleSaveItem = async () => {
    itemFormLoading();
    await saveItem(currentItem);
    handleReloadItems();
    closeItemForm();
    successNotification("Item guardado con exito.");
  };

  const handleDeleteItem = async () => {
    deleteDialogLoading();
    await deleteItem(currentItem.id);
    handleReloadItems();
    closeDeleteDialog();
    successNotification("Item eliminado con exito");
  };

  const handleSearch = async(input) => {
    const items = await searchItems(input);
    setData(items);
    setItemsLoaded(true);  
  }

  return {
    toolbarProps: {
      onReload: handleReloadItems,
      onNew: handleNewItem,
      onSearch: handleSearch,
    },
    itemOverviewProps: {
      columns,
      data,
      fetchData,
      itemsLoaded,
      setItemsLoaded,
      onEdit: handleEditItem,
      onDelete: openDeleteDialog,
      onItemSelected: handleItemSelected,
    },
    itemFormProps: {
      open: itemFormOpen,
      data: currentItem,
      loading: itemFormLoadingState,
      handleClose: closeItemForm,
      handleConfirm: handleSaveItem,
      handleFormChange: handleFormChange,
    },
    notificationProps: {
      ...notification,
      handleClose: closeNotification,
    },
    dialogProps: {
      open: deleteDialogOpen,
      loading: deleteDialogLoadingState,
      title: "Eliminar Item",
      message: "Esta seguro de eliminar el item seleccionado?",
      handleClose: closeDeleteDialog,
      handleConfirm: handleDeleteItem,
    },
  };
};

export default useItemOverview;
