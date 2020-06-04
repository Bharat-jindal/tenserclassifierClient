import React from "react";
import logo from "./logo.svg";
import "antd/dist/antd.css";
import "./App.css";
import { Upload, message, Tooltip, Button, Input } from "antd";
import * as axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import Spinner from "./Spinner";

function App() {
  const [classification, setClassification] = React.useState();
  const [url, setUrl] = React.useState();
  const [spinner,setSpinner] = React.useState(false);

  const handleUrlRequest = (evt) => {
    setSpinner(true)
    axios.post(`/image-from-url`, { url: url }).then((response) => {
      setSpinner(false)
      setClassification(response.data.classification);
    });
  };

  return (
    <div className="App">
      {classification ? (
        <div>
          <div>
            I'm {classification[0].probability * 100}% sure that this is:
          </div>
          <div style={{ fontWeight: "bold", fontSize: "2em" }}>
            {classification[0].className}
          </div>
          {classification[1] ? (
            <span>
              <div>Although it may also be...</div>
              <div>{classification[1].className}</div>
            </span>
          ) : null}

          <Button
            type={"primary"}
            onClick={(evt) => {
              setClassification();
              setUrl();
            }}
          >
            Start over
          </Button>
        </div>
      ) : (
        <div>
          <Upload
            name={"upload"}
            showUploadList={false}
            action={`/image`}
            beforeUpload={() => {
              setSpinner(true)
              return true
            }}
            onChange={(info) => {
              if (info.file.status === "done") {
                setClassification(info.file.response.classification);
                setSpinner(false)
              } else if (info.file.status === "error") {
                setSpinner(false)
                message.error(info.file.response);
              }
            }}
          >
            <Tooltip title={"Upload an image"}>
              <Button icon={<UploadOutlined />} />
            </Tooltip>
          </Upload>
          <div style={{ textAlign: "center" }}>or</div>
          <Input
            onChange={(evt) => setUrl(evt.target.value)}
            placeholder={"Or paste a link..."}
          />
          <Button onClick={() => handleUrlRequest()}>Go</Button>
        </div>
      )}
      {spinner ? <Spinner />:null}
    </div>
  );
}

export default App;