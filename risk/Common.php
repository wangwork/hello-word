<?php

class Common{

    //测试环境地址
    private $testurl='sys.transfereasy.com:9995';

    //Http Header参数
    private $header=['X-Agent-No:yyyyyyy','X-Agent-Secret:tea_oA0OkdMs0x7EGRP0P5Hr','X-Api-Version:v1'];

    //获取header参数
    public function get_header(){
        return $this->header;
    }

    /**
     * 使用Curl 发送http请求
     * @param string $api
     * @param array $header
     * @param array $param
     * @param string $method
     * @return string
     */
    public function curl_request($api,$header,$param,$method){
        if($method=='GET'||$method=='DELETE'){
            $url_param='';
            foreach ($param as $key =>$value){
                $url_param.=$key.'='.$value.'&';
            }
            $remote_server=$this->testurl.$api.'?'.$url_param;
        }else{
            $remote_server=$this->testurl.$api;
        }

        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL,$remote_server);

        if($method=='DELETE'){
            curl_setopt ($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
        }
        if($method=='POST'){
            curl_setopt($ch,CURLOPT_POSTFIELDS,$param);
        }

        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER,$header);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 99999);//设置超时
        curl_setopt($ch, CURLOPT_HEADER, TRUE);   //表示需要response header
        curl_setopt($ch, CURLOPT_NOBODY, FALSE); //表示需要response body

        $response=curl_exec($ch);


        $httpCode=curl_getinfo($ch, CURLINFO_HTTP_CODE);
        echo "<br/>Response http code : " .$httpCode."<br/>".curl_error($ch);


        if ($httpCode == '200') {
            $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
            $body = substr($response, $headerSize);

        }
        curl_close($ch);
        return $body;
    }
}
?>