import { Spinner } from "@heroui/react";

function loading() {
  return (
    <div className="flex flex-col items-center my-10 h-full ">
      <Spinner size="xl" />
      {/* <span className="text-xs text-muted">Extra Large</span> */}
    </div>
  );
}

export default loading;
