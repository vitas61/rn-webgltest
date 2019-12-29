"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const group_helpers_1 = require("../../helpers/group.helpers");
const object_helpers_1 = require("../../helpers/object.helpers");
const base_store_1 = require("../base-store");
const proxy_store_state_1 = require("./proxy.store.state");
class ProxyStore extends base_store_1.BaseStore {
    constructor(human) {
        super(new proxy_store_state_1.ProxyStoreState());
        this._human = human;
    }
    toggleProxy(proxy, value) {
        if (this.state.proxies) {
            this.state.proxies.forEach((sexGroup) => {
                sexGroup.clothesTypeGroups.forEach(clothesType => {
                    let found = false;
                    clothesType.clothes.forEach(clothesProxy => {
                        if (clothesProxy.name === proxy) {
                            found = true;
                        }
                    });
                    if (found) {
                        switch (clothesType.name) {
                            case 'Костюм':
                                this.toggleProxyClothesType('Блузки');
                                this.toggleProxyClothesType('Платья');
                                this.toggleProxyClothesType('Шорты');
                                this.toggleProxyClothesType('Юбки');
                                this.toggleProxyClothesType('Брюки');
                                this.toggleProxyClothesType('Халаты');
                                break;
                            case 'Халаты':
                                this.toggleProxyClothesType('Костюм');
                                this.toggleProxyClothesType('Блузки');
                                this.toggleProxyClothesType('Платья');
                                this.toggleProxyClothesType('Шорты');
                                this.toggleProxyClothesType('Юбки');
                                this.toggleProxyClothesType('Брюки');
                                break;
                            case 'Блузки':
                            case 'Платья':
                            case 'Шорты':
                            case 'Юбки':
                            case 'Брюки':
                                this.toggleProxyClothesType('Халаты');
                                this.toggleProxyClothesType('Костюм');
                                switch (clothesType.name) {
                                    case 'Блузки':
                                        this.toggleProxyClothesType('Платья');
                                        break;
                                    case 'Платья':
                                        this.toggleProxyClothesType('Блузки');
                                        break;
                                    case 'Шорты':
                                        this.toggleProxyClothesType('Платья');
                                        this.toggleProxyClothesType('Юбки');
                                        this.toggleProxyClothesType('Брюки');
                                        break;
                                    case 'Юбки':
                                        this.toggleProxyClothesType('Платья');
                                        this.toggleProxyClothesType('Шорты');
                                        this.toggleProxyClothesType('Брюки');
                                        break;
                                    case 'Брюки':
                                        this.toggleProxyClothesType('Платья');
                                        this.toggleProxyClothesType('Шорты');
                                        this.toggleProxyClothesType('Юбки');
                                        break;
                                }
                                break;
                        }
                        this.toggleProxyClothesType(clothesType.name);
                    }
                });
            });
        }
        this._human.proxies.toggleProxy(proxy, value);
        if (this.state.proxies) {
            this.state.proxies.forEach((sexGroup, sexGroupKey) => {
                sexGroup.clothesTypeGroups.forEach((clothesType, clothesTypeKey) => {
                    clothesType.clothes.forEach((clothesProxy, clothesProxyKey) => {
                        this.state.proxies[sexGroupKey][clothesTypeKey][clothesProxyKey] = {
                            ...clothesProxy,
                            value: this._human
                                .proxies.children.find(children => children.name === clothesProxy.name).visible
                        };
                    });
                });
            });
            this.updateProxies(this._human.proxies);
        }
    }
    setUpProxies() {
        const sexGroups = [];
        object_helpers_1.objectForEach(group_helpers_1.groupBy(this._human.proxies.children, 'group'), (group, key) => {
            switch (key) {
                case 'clothes':
                    object_helpers_1.objectForEach(constants_1.clothes, (sexGroup, sex) => {
                        const clothesTypes = [];
                        object_helpers_1.objectForEach(sexGroup, (clothesNames, clothesType) => {
                            const clothesArr = [];
                            object_helpers_1.objectForEach(clothesNames, (clothesName) => {
                                object_helpers_1.objectForEach(group, (proxyGroup, proxyKey) => {
                                    if (proxyGroup.name === clothesName) {
                                        clothesArr.push({
                                            name: clothesName,
                                            thumbnail: proxyGroup.thumbnail
                                        });
                                    }
                                });
                            });
                            clothesTypes.push({
                                name: clothesType,
                                clothes: clothesArr
                            });
                        });
                        sexGroups.push({
                            name: sex,
                            clothesTypeGroups: clothesTypes,
                        });
                    });
                    break;
            }
        });
        this.updateProxies(sexGroups);
    }
    updateProxies(proxies) {
        this.setState({
            ...this.state,
            proxies,
        });
    }
    toggleProxyClothesType(type) {
        this.state.proxies.forEach((sexGroup) => {
            sexGroup.clothesTypeGroups.forEach(clothesType => {
                if (clothesType.name === type) {
                    clothesType.clothes.forEach(clothesProxy => {
                        this._human.proxies.toggleProxy(clothesProxy.name, false);
                    });
                }
            });
        });
    }
}
exports.ProxyStore = ProxyStore;
//# sourceMappingURL=proxy.store.js.map