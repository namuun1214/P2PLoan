import * as firebase from "firebase/app";
import "firebase/analytics";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

import { useEffect, useState } from "react";
import { docData, collectionData } from "rxfire/firestore";
import { user as UserObserver } from "rxfire/auth";
import {
  getFirestore,
  doc,
  deleteDoc,
  collection,
  serverTimestamp,
  DocumentData,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getAuth, User } from "firebase/auth";
import { filter, tap } from "rxjs";
import { identity } from "lodash";
import {
  UseCollectionType,
  UseDocumentType,
  UseDocumentWithUserOnceType,
  UseDocumentWithUserType,
  UserDataType,
  UseStorageType,
  UseUserType,
} from "./types";
import { firebaseConfig } from "./firebaseConfig";

export const app =
  firebase.getApps().length > 0.0
    ? firebase.getApps()[0]
    : firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export const useCollection = (path: string): UseCollectionType => {
  const [data, setData] = useState<DocumentData[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!firestore) {
      return;
    }
    const subscription = collectionData(collection(firestore, path)).subscribe(
      (documents) => {
        setData(documents);
        setLoading(false);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [path]);
  return { data, loading };
};

export const useDocument = (path: string): UseDocumentType => {
  const [data, setData] = useState<DocumentData>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!firestore || !auth) {
      return;
    }
    const subscription = docData(doc(firestore, path), {
      idField: "uid",
    }).subscribe((documentData) => {
      setData(documentData);
      setLoading(false);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [path]);

  return { data, loading };
};

export const useUser = (): UseUserType => {
  const [user, setUser] = useState<User | undefined | null>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!auth) {
      return;
    }
    const subscription = UserObserver(auth)
      .pipe(
        filter(identity),
        tap(() => setLoading(false))
      )
      .subscribe((userData) => setUser(userData));
    return () => {
      subscription.unsubscribe();
    };
  }, [auth]);

  return { user, loading };
};

const USER_HOME = "newUsers";
export const useDocumentWithUser = (): UseDocumentWithUserType => {
  const [userData, setUserData] = useState<UserDataType>({});
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  useEffect(() => {
    if (!firestore || !auth || !user) {
      return;
    }
    const subscription = docData(doc(firestore, `${USER_HOME}/${user.uid}`), {
      idField: "uid",
    }).subscribe((documentData) => {
      documentData && setUserData(documentData);
      setLoading(false);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return { userData, loading };
};

export const useDocumentWithUserOnce = (): UseDocumentWithUserOnceType => {
  const [userData, setUserData] = useState<
    (UserDataType & { uid: string }) | undefined
  >();
  const { user } = useUser();
  useEffect(() => {
    if (!firestore || !auth || !user || userData) {
      return;
    }
    getDoc(doc(firestore, `${USER_HOME}/${user.uid}`))
      .then((documentSnap) => {
        setUserData({ ...documentSnap.data(), uid: user.uid });
      })
      .catch((error) => console.log(error));
  }, [user, userData]);

  return [userData, setUserData];
};

const uploadImage = (data: File[] | File, path?: string): Promise<string[]> => {
  if (!Array.isArray(data)) {
    data = [data];
  }
  const promises = data.map((item) => {
    const extension = "." + (item.name.split(".").pop() ?? "jpg");
    const storageReference = ref(
      storage,
      (path ?? "images") + "/" + Date.now().toString() + extension
    );
    const metadata = {
      contentType: item.type,
    };
    return uploadBytes(storageReference, item, metadata);
  });
  return Promise.all(promises).then((snapshots) => {
    const newPromises = snapshots.map((snapshot) =>
      getDownloadURL(snapshot.ref)
    );
    return Promise.all(newPromises);
  });
};

const deleteImage = (url: string): Promise<void> => {
  const reference = ref(storage, url);
  return deleteObject(reference);
};

export const useStorage = (): UseStorageType => {
  return { uploadImage, deleteImage };
};

export const getDocument = (
  path: string
): Promise<DocumentData | undefined> => {
  const documentReference = doc(firestore, path);
  return getDoc(documentReference).then((documentSnap) => documentSnap.data());
};

export const updateDocument = (
  path: string,
  data: DocumentData
): Promise<void> => {
  const documentReference = doc(firestore, path);
  return setDoc(
    documentReference,
    { updatedAt: serverTimestamp(), ...data },
    { merge: true }
  );
};

export const deleteDocument = (path: string): Promise<void> => {
  const reference = doc(firestore, path);
  return deleteDoc(reference);
};

export const updateUserDocument = (data: DocumentData): Promise<void> => {
  const uid = getAuth().currentUser?.uid ?? "doc";
  const documentReference = doc(firestore, USER_HOME + "/" + uid);
  return setDoc(documentReference, data, { merge: true });
};

export const deleteUserDocument = (): Promise<void> => {
  const uid = getAuth().currentUser?.uid ?? "doc";
  return deleteDocument(USER_HOME + "/" + uid);
};
