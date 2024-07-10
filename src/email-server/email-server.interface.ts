export interface EmailServer {
    
    /**
     * @description Send email
     */
    sendMail(content: Object): Promise<void>;

    /**
     * @description Send email sandbox
     */
    sendMailSandBox(content: Object): Promise<void>;
}
