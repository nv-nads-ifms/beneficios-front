import { deleteData, getData, postData, postImage, putData, putImage } from "../api";
import { dataURLtoFile } from "../utils/util";

class DataService {
  constructor(url) {
    this.url = url;
  }

  getDefaultData(params) {
    return getData(this.url, params);
  }

  getDataList() {
    return getData(this.url + "/list");
  }

  getPageData() {
    return getData(this.url + "/page");
  }

  getFilterData(params) {
    return getData(this.url + "/list/filter", params);
  }

  getFilter(extraPath, params) {
    return getData(`${this.url}${extraPath}`, params);
  }

  getById(id) {
    return getData(this.url + "/" + id);
  }

  getBy(query) {
    return getData(this.url + "/" + query);
  }

  save(id, params) {
    const isArray = Array.isArray(id);
    if ((isArray) || (id > 0)) {
      return putData(this.url, !isArray ? id : id.join("/"), params);
    }
    return postData(this.url, params);
  }

  saveWithFile(id, params, fileFieldname) {
    const formData = new FormData();
    formData.append("id", parseInt(id));

    if (fileFieldname && params[fileFieldname] != null) {
      let imagem = params[fileFieldname].data;

      if (!(imagem instanceof File)) {
        imagem = dataURLtoFile("data:image/png;base64," + imagem, 'imagem.png');
      }

      formData.append("file", imagem);
    }
    formData.append('form', new Blob([JSON.stringify(params)], {
      type: "application/json"
    }));
    
    if (id > 0) {
      return putImage(`${this.url}/${id}`, formData);
    }
    return postImage(`${this.url}`, formData);
  }

  delete(id) {
    return deleteData(this.url + "/" + id);
  }
}

export default DataService;
