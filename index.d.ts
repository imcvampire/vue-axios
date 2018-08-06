import Vue, {PluginFunction, PluginObject} from "vue";
import {AxiosInstance} from "axios";

declare module "vue/types/vue" {

  interface Vue {
    axios: AxiosInstance;
    $http: AxiosInstance;
  }

}

declare class VueAxios {
  static install: PluginFunction<AxiosInstance>;
}

export default VueAxios;
