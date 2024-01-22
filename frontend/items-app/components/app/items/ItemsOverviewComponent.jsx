import Grid from "@/components/ui/data/Grid";
import CrudToolbar from "@/components/ui/crud/CrudToolbar";

const Overview = ({ columns, data, onItemSelected, onEdit, onDelete }) => {
  return (
    <>
      <Grid
        columns={columns}
        data={data||[]}
        pagination={true}
        onRowSelected={onItemSelected}
        actionRow={
          <CrudToolbar
            size={"small"}
            noIcon
            onEdit={onEdit}
            onDelete={onDelete}            
          />
        }
      />
    </>
  );
};

export default Overview;
