import { AxiosStatic } from "axios";
// @ts-ignore
import { App } from "vue";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $http: AxiosStatic;
    axios: AxiosStatic;
  }

  export interface App {
    axios: AxiosStatic;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $http: AxiosStatic;
    axios: AxiosStatic;
  }

  interface VueConstructor {
    axios: AxiosStatic;
  }
}

declare function VueAxios(app: App, axios: AxiosStatic): void;

export default VueAxios;
