/* eslint max-classes-per-file: "off" */
/* eslint-disable */

const app = document.getElementById('app');
let init = () => {
  // const dragme = document.querySelector('.dragme');
  const dropzone = document.querySelector('.dropzone');
  const list = document.querySelector('.list');
  //dragenter
  dropzone.addEventListener('dragenter', (e) => {
    e.target.classList.add('active');
  }); // dragleave
  dropzone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.target.classList.remove('active');
  }); //dragover
  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
  });
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove('active');
    const { files } = e.dataTransfer;
    handleFileUpload(files);
  });

  /* To prevent opening the img in the tab if dropped in the incorrect place */
  document.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  document.addEventListener('drop', (e) => {
    e.preventDefault();
  });
  const showFilePreview = (file) => {
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', (e) => {
      const div = document.createElement('div');
      div.innerHTML = `
   <div class="image-preview" style="display:flex;">
   <img src="${e.target.result}" alt="${file.name}" />
   <p>${file.name}<span> ${file.size} bytes</span></p>
   `;
      list.append(div);
    });
  };
  const isAllowedType = (file) => {
    return ['image/svg+xml', 'image/png', 'image/jpeg '].includes(file.type);
  };
  const handleFileUpload = (fileList) => {
    const filesToUpload = [...fileList].filter(isAllowedType);
    filesToUpload.forEach(showFilePreview);
  };
};
if ('draggable' in document.createElement('div')) {
  init();
}