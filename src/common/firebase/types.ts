import { User } from 'firebase/auth';
import { DocumentData, Timestamp } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

export type UseCollectionType = {
  data?: DocumentData[];
  loading: boolean;
};

export type UseDocumentType = {
  data?: DocumentData;
  loading: boolean;
};

export type TimestampType = {
  nanoseconds: number;
  seconds: number;
};

export type UserDataType = {
  accountNumber: string;
  bankName: string;
  ownerName: string;
  phoneNumber: string;
};

export type UseDocumentWithUserType = {
  userData: UserDataType;
  loading: boolean;
};

export type UseDocumentWithUserOnceType = [
  userData: (UserDataType & { uid: string }) | undefined,
  setUserData: Dispatch<
    SetStateAction<
      | (UserDataType & {
        uid: string;
      })
      | undefined
    >
  >,
];

export type UseUserType = {
  user: User | undefined | null;
  loading: boolean;
};

export type UseStorageType = {
  uploadImage: (data: File[] | File, path?: string) => Promise<string[]>;
  deleteImage: (url: string) => Promise<void>;
};
