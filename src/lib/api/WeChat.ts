import axios from 'axios';
import { stringify } from 'querystring';
import { HttpException, HttpStatus } from '@nestjs/common';

export interface WeAuth {
  openid: string;
  session_key: string;
  unionid: string;
  errcode: number;
  errmsg: string;
}

export const WeChat = {
  weauth: async (code: string): Promise<{ data: WeAuth }> => {
    const openIdData = stringify({
      appid: process.env.WECHAT_APP_ID,
      secret: process.env.WECHAT_APP_SECRET,
      grant_type: 'authorization_code',
      js_code: code,
    });

    try {
      return await axios.post(
        'https://api.weixin.qq.com/sns/jscode2session',
        openIdData,
      );
    } catch (error) {
      throw new HttpException(
        `Wechat auth error: ${error.message}`,
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  },
};
