- SignUp Flow
1. Enter email-or-phone
2. Send OTP POST /get-otp/no-auth -> type OTP 
3. CheckOTP POST /verify-otp/no-auth typed in step 2
  - if(true) 
    Create Password or PIN (required or skip this step)
    POST /auth/sign-up/by-usr 
    {
      "phoneOrEmail": "0326113235",
      "password": "123456",
      "otpCode": "11111",
      "otpId": "61f0483b-60ea-4d89-b296-c03d438b5b0c"
    }
    