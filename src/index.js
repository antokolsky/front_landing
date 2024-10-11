import "./style/index.scss";

import { cardLoader } from "./components/cards";
import { STLViewerEnable } from "./components/threed";
import { subscribeFormInit } from "./components/subscribe";
import { purchaseDialogInit } from "./components/purchase-form";

cardLoader("#cards", "#load-more");

STLViewerEnable("stlviewer");

subscribeFormInit();

purchaseDialogInit();
