"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import ItemPageComponent from "@/components/app/items/ItemPageComponent";
import ItemForm from "@/components/app/items/ItemFormComponent";
import { saveItem, searchItems } from "@/components/services/api";

const ItemPage = () => {
  const params = useSearchParams();
  const id = Number.parseInt(params.get("id")) || 0;
  const [loading, setLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState({ id: 0, description: "" });

  useEffect(() => {
    const fetchData = async () => {
      const item = await searchItems(id);
      setCurrentItem(item);
      setItemLoading(true);
    };

    if (!itemLoading) fetchData();
  }, [itemLoading]);

  const handleFormChange = (e) => {
    setCurrentItem({ ...currentItem, description: e.target.value });
  };

  const handleClose = () => {
    window.location = '/items';
  };

  const handleConfirm = async () => {
    setLoading(true);
    await saveItem(currentItem);
    window.location = '/items';
  };

  return (
    <ItemPageComponent title={"Gestionar Item"}>
      <ItemForm data={currentItem} handleFormChange={handleFormChange} />
      <Divider style={{ margin: "16px 0px" }} />
      <Grid container justifyContent="flex-end">
        <Button onClick={handleClose}>CANCELAR</Button>

        <LoadingButton
          onClick={handleConfirm}
          variant="contained"
          loading={loading}
        >
          ACEPTAR
        </LoadingButton>
      </Grid>
    </ItemPageComponent>
  );
};

export default ItemPage;
