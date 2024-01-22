"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Modal from "@/components/ui/notification/Modal";
import CrudToolbar from "@/components/ui/crud/CrudToolbar";
import ItemForm from "@/components/app/items/ItemFormComponent";
import ItemPageComponent from "@/components/app/items/ItemPageComponent";
import ItemsOverviewComponent from "@/components/app/items/ItemsOverviewComponent";
import Dialog from "@/components/ui/notification/Dialog";
import Notification from "@/components/ui/notification/Notification";
import useItemOverview from "@/components/app/items/useItemOverview";
import ItemPage from '@/app/items/[id]/page';

export default function Items() {
  const params = useSearchParams();
  const id = Number.parseInt(params.get('id')) || 0;
  const description = params.get('q') || '';
  if (id > 0 && description.length === 0) {
    return (<ItemPage />);
  }

  const {
    toolbarProps,
    itemOverviewProps,
    itemFormProps,
    notificationProps,
    dialogProps,    
  } = useItemOverview();

  const {itemsLoaded, fetchData } = itemOverviewProps;

  useEffect(() => {
    if (!itemsLoaded) fetchData(description);
  }, [itemsLoaded, description]);

  const toolbar = <CrudToolbar {...toolbarProps} />;

  return (
    <Suspense>
      <ItemPageComponent title={"Overview"} toolbar={toolbar}>
        <ItemsOverviewComponent {...itemOverviewProps} />
        <Modal {...itemFormProps}>
          <ItemForm {...itemFormProps} />
        </Modal>        
      </ItemPageComponent>
      <Notification {...notificationProps} />
      <Dialog {...dialogProps} />
    </Suspense>
  );
}
