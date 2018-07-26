// Modules
import React, { Component } from 'react';

// Contexts
import {withStageContext, StageContext} from '../Contexts/StageContext';
import {withAnimationsContext, AnimationsContext} from '../Contexts/AnimationsContext';
import {withQRCodeAPIContext, QRCodeAPIContext} from '../Contexts/QRCodeAPIContext';

// Components
import NextButton from '../NextButton';
import { GithubPicker , ChromePicker} from 'react-color';
import { Upload, Icon, message } from 'antd';


class Editor2 extends React.Component {
  constructor(){
    super();
    this.state = {
      uploadTab : "image",
      uploadedFile : {},
      uploadedFileList : [],
    };
  }

  showTextUploadTab(){
    this.setState({uploadTab : "text"});
  }

  showImageUploadTab(){
    this.setState({uploadTab : "image"});
  }

  imageUploadingDone(info){
    console.log("status : done ", info);
    message.success(`${info.file.name} file uploaded successfully.`);

    this.setState({
      uploadedFileList : info.fileList,
      uploadedFile : info.file,
    });
    this.props.qrcodeAPIContext.setUserUploadedImageUrl("https://acme.codes" + info.file.response.filepath);
    console.log("qrcodeInfo.userUploadedImageUrl : ",this.props.qrcodeAPIContext.qrcodeInfo.userUploadedImageUrl);
    this.props.qrcodeAPIContext.requestAnimation();
  }

  imageUploadingError(info){
    console.log("status : error", info);
    message.error(`${info.file.name} file upload failed.`);

    this.setState({
      uploadedFileList : [],
      uploadedFile : {},
    });
  }

  imageUploadingHandler(info){
    console.log("status : uploading", info);
    this.props.qrcodeAPIContext.updateTag('userUploadedImage', 'Image will be animated soon', true, false, true);
  }

  imageNotUploadingHandler(info){
    console.log("status : not uploading", info);
    if (info.fileList.length == 0) {
      this.setState({
        uploadedFileList : [],
        uploadedFile : {},
      });
      this.props.qrcodeAPIContext.setIsAnimation(false);
      this.props.qrcodeAPIContext.setUserUploadedImageUrl("");
      this.props.qrcodeAPIContext.updateTag('userUploadedImage', '', true, false, true);
      this.props.qrcodeAPIContext.requestStatic();
    }
  }

  render() {
    const Dragger = Upload.Dragger;

    const draggerProps = {
      name: 'file',
      multiple: false, // TODO: make to state variable so only available on advanced
      action: 'https://acme.codes/coderunner/upload',
      onChange : (info) => {
        const status = info.file.status;
        console.log("onChange status: " + status ,info);
        if (status !== 'uploading')   { this.imageNotUploadingHandler(info);  }
        else                          { this.imageUploadingHandler(info);     }

        if (status === 'done')        { this.imageUploadingDone(info);        }
        else if (status === 'error')  { this.imageUploadingError(info);       }
      },
    };

    let uploadTextDisplay = this.state.uploadTab == "text" ? "is-active" : "";
    let uploadImageDisplay = this.state.uploadTab == "image" ? "is-active" : "";

    return (
      <div className="editor1 container ">
        <div className="title">
          Add Image or Text to Animate
        </div>

        <div className="tabs is-centered is-fullwidth">
          <ul>
            <li className={uploadImageDisplay}>
              <a onClick={this.showImageUploadTab.bind(this)}>Image</a>
            </li>
            <li className={uploadTextDisplay}>
              <a onClick={this.showTextUploadTab.bind(this)}>Text</a>
            </li>
          </ul>
        </div>

        {
          this.state.uploadTab == "text" &&
          <div>
            Text to Animate
            <br />
            <textarea name="" cols="" rows=""></textarea>
          </div>
        }

        {
          this.state.uploadTab == "image" &&
          <div>
            <br />
            <Dragger {...draggerProps}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
          </div>
        }


        <NextButton />

      </div>
    );
  }
}

export default  withAnimationsContext(
                withStageContext(
                withQRCodeAPIContext(
                  Editor2
                )));
