import fileExplorer from '@kloudless/file-explorer'
import { Controller } from 'stimulus'

// <button id="choose-files" data-controller="kloudless" >Choose Files</button>

export default class extends Controller {
  connect() {
    const explorer = fileExplorer.explorer({
      app_id: 'T2ouRNLi0iEVFsKg740hxlicOzHOxWmuVMr2Q3n4pXdDAhf4',
    })

    explorer.choosify(document.getElementById('choose-files'))
  }
}
