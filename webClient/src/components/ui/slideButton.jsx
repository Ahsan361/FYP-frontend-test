import { IconButton } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

const SlideNavButton = ({ onClick, direction = "prev", customStyles = {} }) => {
  const isPrev = direction === "prev";
  const icon = isPrev ? <ChevronLeft fontSize="large" /> : <ChevronRight fontSize="large" />;

  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        bgcolor: "rgba(255, 255, 255, 0.2)",
        color: "white",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        width: 50,
        height: 50,
        "&:hover": {
          bgcolor: "rgba(255, 255, 255, 0.3)",
          transform: "translateY(-50%) scale(1.1)",
        },
        transition: "all 0.3s ease",
        ...(isPrev ? { left: 20 } : { right: 20 }),
        ...customStyles,
      }}
    >
      {icon}
    </IconButton>
  );
};

export default SlideNavButton;