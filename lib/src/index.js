"use strict";
// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var datetime_1 = __importDefault(require("./Abushakir/datetime"));
exports.EtDatetime = datetime_1.default;
var bh_1 = __importDefault(require("./Abushakir/bh"));
exports.BahireHasab = bh_1.default;
var etc_1 = __importDefault(require("./Abushakir/etc"));
exports.ETC = etc_1.default;
var duration_1 = __importDefault(require("./utils/duration"));
exports.Duration = duration_1.default;
var numberConvertor_1 = __importDefault(require("./utils/numberConvertor"));
exports.ConvertToEthiopic = numberConvertor_1.default;
