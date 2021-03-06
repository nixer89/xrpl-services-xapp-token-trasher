import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { XummTypes } from 'xumm-sdk';
import { GenericBackendPostRequest, TransactionValidation } from '../utils/types';

@Injectable()
export class XummService {
    constructor(private app: AppService) {}

    isTestMode = false;
    xrplServicesBackendURL = this.isTestMode ? 'http://localhost:4001' : 'https://api.xrpl.services';

    async submitPayload(payload:GenericBackendPostRequest): Promise<XummTypes.XummPostPayloadResponse> {
        try {
            console.log("submitting payload: " + JSON.stringify(payload));
            return this.app.post(this.xrplServicesBackendURL+"/api/v1/platform/payload", payload);
        } catch(err) {
            //console.log("error: ");
            console.log(JSON.stringify(err))
            return null;
        }
    }

    async getPayloadInfo(payloadId:string): Promise<XummTypes.XummGetPayloadResponse> {
        try {
            return this.app.get(this.xrplServicesBackendURL+"/api/v1/platform/payload/"+payloadId);
        } catch(err) {
            console.log(JSON.stringify(err))
            return null;
        }
    }

    async deletePayload(payloadId:string): Promise<XummTypes.XummDeletePayloadResponse> {
        try {
            return this.app.delete(this.xrplServicesBackendURL+"/api/v1/platform/payload/"+payloadId);
        } catch(err) {
            console.log(JSON.stringify(err))
            return null;
        }
    }
    
    async getxAppOTTData(token: string): Promise<any> {
        try {
            return this.app.get(this.xrplServicesBackendURL+"/api/v1/platform/xapp/ott/" + token);
        } catch(err) {
            console.log(JSON.stringify(err))
            return { error: true, success: false, testnet:false }
        }
    }

    async sendxAppEvent(data: any): Promise<any> {
        try {
            return this.app.post(this.xrplServicesBackendURL+"/api/v1/platform/xapp/event", data);
        } catch(err) {
            console.log(JSON.stringify(err))
            return { error: true, success: false, testnet:false }
        }
    }

    async sendxAppPush(data: any): Promise<any> {
        try {
            return this.app.post(this.xrplServicesBackendURL+"/api/v1/platform/xapp/evepushnt", data);
        } catch(err) {
            console.log(JSON.stringify(err))
            return { error: true, success: false, testnet:false }
        }
    }

    async checkSignIn(payloadId:string): Promise<TransactionValidation> {
        try {
            return this.app.get(this.xrplServicesBackendURL+"/api/v1/check/signin/"+payloadId);
        } catch(err) {
            console.log(JSON.stringify(err))
            return { error: true, success: false, testnet:false }
        }
    }

    async validateTransaction(payloadId:string): Promise<TransactionValidation> {
        try {
            return this.app.get(this.xrplServicesBackendURL+"/api/v1/xrpl/validatetx/"+payloadId);
        } catch(err) {
            console.log(JSON.stringify(err))
            return { error: true, success: false, testnet:false }
        }
    }

    async validateEscrowPayment(payloadId:string): Promise<TransactionValidation> {
        try {
            return this.app.get(this.xrplServicesBackendURL+"/api/v1/escrow/validatepayment/" + payloadId);
        } catch(err) {
            console.log(JSON.stringify(err))
            return { error: true, success: false, testnet:false }
        }
    }

    async checkPayment(payloadId:string): Promise<TransactionValidation> {
        try {
            return this.app.get(this.xrplServicesBackendURL+"/api/v1/check/payment/"+payloadId);
        } catch(err) {
            console.log(JSON.stringify(err))
            return { error: true, success: false, testnet:false }
        }
    }

    async signInToValidateTimedPayment(payloadId:string, referer?:string): Promise<TransactionValidation> {
        try {
            return this.app.get(this.xrplServicesBackendURL+"/api/v1/check/signinToValidatePayment/" + payloadId + (referer ? ("?referer="+referer) :""));
        } catch(err) {
            console.log(JSON.stringify(err))
            return { error: true, success: false, testnet:false }
        }
    }

    async getKycStatus(account: string): Promise<any> {
        try {
            return this.app.get("https://xumm.app/api/v1/platform/kyc-status/" + account);
        } catch(err) {
            console.log(JSON.stringify(err))
            return null;
        }
    }

    async getFixAmounts(): Promise<any> {
        try {
            return this.app.get(this.xrplServicesBackendURL+"/api/v1/payment/amounts");
        } catch(err) {
            console.log(JSON.stringify(err))
            return [];
        }
    }
}