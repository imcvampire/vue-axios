import { AxiosInstance, AxiosStatic } from "axios";
import { App } from "vue";

type VueAxiosInstance = AxiosInstance | AxiosStatic;

declare module "vue" {
  export interface ComponentCustomProperties {
    $http: VueAxiosInstance;
    axios: VueAxiosInstance;
  }
}

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $http: VueAxiosInstance;
    axios: VueAxiosInstance;
  }

  export interface App {
    axios: VueAxiosInstance;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $http: VueAxiosInstance;
    axios: VueAxiosInstance;
  }

  interface VueConstructor {
    axios: VueAxiosInstance;
  }
}

declare function VueAxios(app: App, axios: VueAxiosInstance | Record<string, VueAxiosInstance>): void;

export default VueAxios;
