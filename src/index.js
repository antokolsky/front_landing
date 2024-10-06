import "./style/index.scss";

import { cardLoader } from "./components/cards";
import { STLViewerEnable } from "./components/threed";
import { subscribeFormInit } from "./components/subscribe";

cardLoader("#cards", "load-more");

STLViewerEnable("stlviewer");

subscribeFormInit();
