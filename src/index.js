import "./style/index.scss";

import { swipedEvents } from "./components/cards/swiped-events";
import { resizeWatcher } from "./components/header";
import { cardLoader } from "./components/cards";
import { STLViewerEnable } from "./components/threed";
import { subscribeFormInit } from "./components/subscribe";
import { purchaseDialogInit } from "./components/purchase-form";

swipedEvents(window, document);

resizeWatcher();

cardLoader("#cards", "#load-more");

STLViewerEnable("stlviewer");

subscribeFormInit();

purchaseDialogInit();
