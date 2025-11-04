
import { Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme, CssBaseline, IconButton, useMediaQuery } from "@mui/material";
import { useMemo, useState } from "react";
import type { PaletteMode } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";



export default function App() {
  // Detecta preferencia de sistema
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>(prefersDark ? "dark" : "light");
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: "#1976d2" },
      secondary: { main: "#ff9800" },
      background: { default: mode === "dark" ? "#181c24" : "#f4f6fa" },
    },
    typography: {
      fontFamily: 'Inter, Roboto, "Helvetica Neue", Arial, sans-serif',
      h4: { fontWeight: 700, letterSpacing: 2 },
    },
    shape: { borderRadius: 12 },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <AppBar position="static" color="primary" elevation={2}>
          <Toolbar>
            <Typography
              variant="h4"
              component="div"
              sx={{
                flexGrow: 1,
                textAlign: "center",
                color: "primary.contrastText",
                textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              Task Tracker
            </Typography>
            <IconButton sx={{ ml: 2 }} onClick={() => setMode(m => m === "light" ? "dark" : "light")}
              color="inherit" aria-label="Alternar modo claro/oscuro">
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
