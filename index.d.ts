import Vue, {PluginFunction, PluginObject} from "vue";
import { AxiosStatic } from "axios";

declare module "vue/types/vue" {

  interface Vue {
    axios: AxiosStatic;
    $http: AxiosStatic;
  }

  interface VueConstructor {
    axios: AxiosStatic;
  }
}

declare class VueAxios {
  static install: PluginFunction<AxiosStatic>;
}

export default VueAxios;
