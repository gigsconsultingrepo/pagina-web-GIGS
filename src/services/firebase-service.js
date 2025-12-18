// src/services/firebase-service.js
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase"

export async function getServices() {
  const ref = collection(db, "services")
  const snapshot = await getDocs(ref)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

