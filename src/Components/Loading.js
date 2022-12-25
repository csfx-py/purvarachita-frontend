import { HourglassBottom } from "@mui/icons-material";
import "../loading.css";

function Loading() {
  return (
    <div className="backdrop">
      <HourglassBottom className="spin" />
    </div>
  );
}

export default Loading;
