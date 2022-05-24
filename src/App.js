
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Counter from "./pages/Counter";
import KitchenPage from "./pages/Kitchen";
import ModifyMenu from "./pages/ModifyMenu";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { orange, purple } from "@material-ui/core/colors";
import Layout from "./components/Layout";
import { primary, secondary } from "./constants/styles";
import Detail from "./pages/Detail";

const theme = createTheme({
    palette: {
        primary: {
            main: orange[500]
        },
        secondary: {
            main: secondary
        }
    },
    typography: {
        fontFamily: 'Quicksand',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,

    }
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path="/">
                            <KitchenPage />
                        </Route>
                        <Route exact path="/counter">
                            <Counter />
                        </Route>
                        <Route exact path="/modify-menu">
                            <ModifyMenu />
                        </Route>
                        <Route exact path="/detail/:id" children={<Detail />} />
                    </Switch>
                </Layout>
            </Router>
        </ThemeProvider>
    );
}

export default App;