// import React, { useEffect, useRef } from "react";

// const CKEditor = ({ onChange, editorLoaded, name, value, uploadImage }) => {
//   const editorRef = useRef();
//   const { CKEditor, ClassicEditor } = editorRef.current || {};
//   useEffect(() => {
//     editorRef.current = {
//       CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
//       ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
//     };
//   }, []);
//     useEffect(() => {
//       if (CKEditor && ClassicEditor && editorLoaded) {
//         ClassicEditor.create(editorRef.current, {
//           plugins: ["Image"],
//           toolbar: [
//             "imageUpload",
//             "|",
//             "bold",
//             "italic",
//             "bulletedList",
//             "numberedList",
//           ],
//           image: {
//             toolbar: [
//               "imageTextAlternative",
//               "imageStyle:full",
//               "imageStyle:side",
//             ],
//             upload: {
//               types: ["image/png", "image/jpg", "image/jpeg"],
//               handler: uploadImage, // Pass the image upload handler function
//             },
//           },
//         })
//           .then((editor) => {
//             editor.setData(value);
//             editor.model.document.on("change", () => {
//               const data = editor.getData();
//               onChange(data);
//             });
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       }
//     }, [CKEditor, ClassicEditor, editorLoaded, onChange, uploadImage, value]);
//   return (
//     <>
//       {editorLoaded ? (
//         <CKEditor
//           type=""
//           name={name}
//           editor={ClassicEditor}
//           data={value}
//           onChange={(event, editor) => {
//             const data = editor.getData();
//             onChange(data);
//           }}
//           onInit={(editor) => {
//             editor.plugins.get("FileRepository").createUploadAdapter = (
//               loader
//             ) => {
//               return new MyUploadAdapter(loader);
//             };
//           }}
//         />
//       ) : (
//         <div>Editor loading</div>
//       )}
//     </>
//   );
// };

// export default CKEditor;

// import React, { useEffect, useRef } from "react";

// const CKEditor = ({ onChange, editorLoaded, name, value, uploadImage }) => {
//   const editorRef = useRef();
//   const { CKEditor, ClassicEditor } = editorRef.current || {};

//   useEffect(() => {
//     editorRef.current = {
//       CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
//       ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
//     };
//   }, []);

//   useEffect(() => {
//     if (CKEditor && ClassicEditor && editorLoaded) {
//       ClassicEditor.create(editorRef.current, {
//         plugins: ["Image"],
//         toolbar: [
//           "imageUpload",
//           "|",
//           "bold",
//           "italic",
//           "bulletedList",
//           "numberedList",
//         ],
//         image: {
//           toolbar: [
//             "imageTextAlternative",
//             "imageStyle:full",
//             "imageStyle:side",
//           ],
//           upload: {
//             types: ["image/png", "image/jpg", "image/jpeg"],
//             handler: uploadImage, // Pass the image upload handler function
//           },
//         },
//       })
//         .then((editor) => {
//           editor.setData(value);
//           editor.model.document.on("change", () => {
//             const data = editor.getData();
//             onChange(data);
//           });
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   }, [CKEditor, ClassicEditor, editorLoaded, onChange, uploadImage, value]);

//   return (
//     <>
//       {editorLoaded ? <div ref={editorRef}></div> : <div>Editor loading</div>}
//     </>
//   );
// };

// export default CKEditor;

import React, { useEffect, useRef } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/fire-config";
import Compressor from "compressorjs";

const CKEditor = ({ onChange, editorLoaded, name, data }) => {
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise(async (resolve, reject) => {
          try {
            let compressedImg;
            const file = await loader.file;
            compressedImg = await new Promise((resolve) => {
              new Compressor(file, {
                maxWidth: 1500,
                quality: 0.8,
                success(result) {
                  resolve(result);
                },
                error(err) {
                  console.error("Image compression error:", err);
                  resolve(file);
                },
              });
            });

            const storageRef = ref(storage, `blogImages/${compressedImg.name}`);
            await uploadBytes(storageRef, compressedImg);
            // const storageRef = ref(storage, `blogImages/${file.name}`);
            // await uploadBytes(storageRef, file);
            const imageURL = await getDownloadURL(storageRef);
            resolve({ default: imageURL });
          } catch (error) {
            console.error(error);
            reject(error);
          }
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  const editorRef = useRef();
  const { CKEditor: Editor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);

  return (
    <>
      {editorLoaded ? (
        <Editor
          type=""
          name={name}
          config={{
            extraPlugins: [uploadPlugin],
          }}
          editor={ClassicEditor}
          data={data}
          onReady={(editor) => {
            uploadPlugin(editor);
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      ) : (
        <div>Editor Loading</div>
      )}
    </>
  );
};

export default CKEditor;
