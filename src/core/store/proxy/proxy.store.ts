import { clothes, groups, labels } from "../../constants";
import { groupBy } from "../../helpers/group.helpers";
import { objectForEach } from "../../helpers/object.helpers";
import { Clothes, ClothesTypeGroup, SexGroup } from "../../models/clothes";
import { Modifier, ModifierGroup, ModifierSubgroup } from "../../models/modifier";
import { BaseStore } from "../base-store";
import { ProxyStoreState } from "./proxy.store.state";

export class ProxyStore extends BaseStore<ProxyStoreState>  {
  private readonly _human;

  constructor(human) {
    super(new ProxyStoreState());

    this._human = human;
  }

  public toggleProxy(proxy, value) {
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
                  .proxies.children.find(children =>
                      children.name === clothesProxy.name
                  )!.visible
            };
          });
        });
      });
      this.updateProxies(this._human.proxies);
    }
  }

  public setUpProxies() {
    const sexGroups: SexGroup[] = [];
    objectForEach(groupBy(this._human.proxies.children, 'group'), (group, key) => {
      switch (key) {
        case 'clothes':
          objectForEach(clothes, (sexGroup, sex) => {
            const clothesTypes: ClothesTypeGroup[] = [];
            objectForEach(sexGroup, (clothesNames, clothesType) => {
              const clothesArr: Clothes[] = [];
              objectForEach(clothesNames, (clothesName) => {
                objectForEach(group, (proxyGroup, proxyKey) => {
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

  private updateProxies(proxies) {
    this.setState({
      ...this.state,
      proxies,
    });
  }

  private toggleProxyClothesType(type) {
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
