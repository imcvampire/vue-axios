import { AxiosStatic } from "axios";
import { App } from "vue";

export declare function VAxios(app: App): AxiosStatic;
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $http: AxiosStatic;
    axios: AxiosStatic;
  }

  export interface App {
    axios: AxiosStatic;
  }
}

declare function VueAxios(app: App, axios: AxiosStatic): void;

export default VueAxios;
