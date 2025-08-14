import { CssBaseline, ThemeProvider, Typography, Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";

//my custom
import Button from "../../../components/ui/Button";
import { lightTheme, darkTheme } from '../../../styles/theme';

function HistorySection() {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container>
                {/* Left Column */}
                <Grid size={{ sm: 14, md: 8 }}>
                    <Box
                        sx={{
                            height: "100%",
                            backgroundColor: theme.palette.background,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "left",
                            p: { xs: 2, sm: 4, md: 8 },
                            pr: { xs: 2, sm: 8, md: 20 },
                            color: theme.palette.mode === "dark" ? theme.palette.text.primary : "#101010",
                            gap: { xs: 2, sm: 4 },
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                                lineHeight: 1.2,
                                textAlign: { xs: "center", sm: "left" },
                            }}
                        >
                            An introduction to the ancient Greek world
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                                lineHeight: 1.5,
                            }}
                        >
                            Embark on a guided journey through the ancient Greek world; from the rise of the Greek city states to the empire of Alexander the Great.
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                                lineHeight: 1.5,
                            }}
                        >
                            Enjoy some of the highlights of the Museum's exceptional collection, including sculptures from the Parthenon and Mausoleum of Halikarnassos, regarded as one of the Seven Wonders of the Ancient World.
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                                lineHeight: 1.5,
                            }}
                        >
                            Please note that due to planned gallery closures:
                        </Typography>

                        <Typography
                            component="div"
                            sx={{
                                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                                lineHeight: 1.5,
                            }}
                        >
                            <b>Galleries on this tour</b>
                            <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                                <li>Tour dates scheduled 18–29 August will not visit Room 21: Mausoleum of Halikarnassos and Room 22: The world of Alexander.</li>
                                <li>Tour dates scheduled 15–26 September will not visit Room 18: Greece: Parthenon.</li>
                            </ul>
                        </Typography>

                        <Typography
                            component="div"
                            sx={{
                                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                                lineHeight: 1.5,
                            }}
                        >
                            <b>Galleries on this tour</b>
                            <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                                <li>Room 12b: Greece: Mycenaeans (The Arthur I Fleischman Gallery)</li>
                                <li>Room 15: Athens and Lycia</li>
                                <li>Room 18: Greece: Parthenon</li>
                                <li>Room 21: Mausoleum of Halikarnassos</li>
                                <li>Room 22: The World of Alexander</li>
                            </ul>
                        </Typography>

                        <Button variant="contained" sx={{ width: { xs: "50%", sm: "30%", md: "40%" } }}>
                            <Typography variant="h6">
                                Book now
                            </Typography>
                        </Button>
                    </Box>
                </Grid>

                {/* Right Column */}
                <Grid size={{ xs: 14, sm: 14, md: 4 }}>
                    <Box
                        sx={{
                            height: "100%",
                            backgroundColor: theme.palette.background,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            p: { xs: 2, sm: 4, md: 8 },
                            color: theme.palette.mode === "dark" ? theme.palette.text.primary : "#101010",
                            gap: { xs: 2, sm: 4 },
                        }}
                    >
                        <Box sx={{ flex: 0.8, textAlign: "center" }}>
                            <img
                                src="room4.jpg"
                                alt="Private Tour"
                                style={{ width: "100%" }}
                            />
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.5rem" },
                                    lineHeight: 1.5,
                                }}
                            >
                                View of Greece and ancient Mediterranean collections.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default HistorySection;
