# Users Collection

```text
users
{
    uid: string
    email: string
    name: string
    provider: string
    referralCode: string
    referredBy: string

    totalReferralEarnings: number
    totalReferralsCount: number
    availableReferralBalanceAmount: number

    createdAt: timestamp
    updatedAt: timestamp
}
```

# Orders Collection

```text
orders
{
    uid: string,
    planId: string (BASIC/PREMIUM)
    amount: number
    status: string (PENDING/SUCCESS/FAILED)
    razorpayOrderId: string
    razorpayPaymentId: string
    createdAt: timestamp
}
```

# ReferralTransaction

```text
referralTransactions
{
referrerUid: string
referredUid: string

    orderId: ObjectId
    rewardAmount: number

    createdAt: timestamp

}
```

# UserProfiles

```text
userProfiles
{
   uid: string,                 // reference to users.uid

   ownerName: string,
   vehicleRegistrationNumber: string,
   bloodGroup: string,
   isDonor: boolean

   createdAt,
   updatedAt
}
```
