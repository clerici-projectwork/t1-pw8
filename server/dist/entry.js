"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const historical_page_1 = __importDefault(require("./routes/historical-page"));
const kpi_page_1 = __importDefault(require("./routes/kpi-page"));
const real_time_page_1 = __importDefault(require("./routes/real-time-page"));
const cors_1 = __importDefault(require("cors"));
const expressApp = (0, express_1.default)();
expressApp.use((0, cors_1.default)({ origin: 'http://localhost:5173' }));
expressApp.use('/api', kpi_page_1.default);
expressApp.use('/api', historical_page_1.default);
expressApp.use('/api', real_time_page_1.default);
expressApp.listen(3000, () => {
    console.log('express server listening on port 3000');
});
