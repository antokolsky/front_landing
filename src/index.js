import "./style/index.scss";

import { cardLoader } from "./components/cards";
import { STLViewerEnable } from "./components/threed";

cardLoader("#cards", "load-more");

STLViewerEnable("stlviewer");
