import { Spinner } from "@heroui/react";

function loading() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Spinner size="xl" />
      {/* <span className="text-xs text-muted">Extra Large</span> */}
    </div>
  );
}

export default loading;
