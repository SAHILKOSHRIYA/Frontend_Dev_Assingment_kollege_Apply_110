import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { toggleTheme } from "../redux/slice/themeSlice";

const useTheme = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggle = () => dispatch(toggleTheme());

  return { theme, toggle };
};

export default useTheme;
