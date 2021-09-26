import { ColorModeProvider } from '@chakra-ui/color-mode';
import CSSReset from '@chakra-ui/css-reset';
import { Box } from '@chakra-ui/layout';
import theme from '@chakra-ui/theme';
import { ThemeProvider } from '@emotion/react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { LoginRoute } from './routers/LoginRoute';

function App() {
  return (
    <Box>
      <Switch>
        <Route exact component={Login} path="/login" />
        <LoginRoute exact component={Dashboard} path="/" />
      </Switch>
    </Box>
  );
}

export default App;
