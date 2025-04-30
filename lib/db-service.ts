import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

export async function getCollection(collectionName: string) {
  const client = await clientPromise
  const db = client.db("hotel-management")
  return db.collection(collectionName)
}

export async function findAll(collectionName: string, query = {}, options = {}) {
  const collection = await getCollection(collectionName)
  return collection.find(query, options).toArray()
}

export async function findOne(collectionName: string, query = {}) {
  const collection = await getCollection(collectionName)
  return collection.findOne(query)
}

export async function insertOne(collectionName: string, document: any) {
  const collection = await getCollection(collectionName)
  return collection.insertOne({
    ...document,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}

export async function insertMany(collectionName: string, documents: any[]) {
  const collection = await getCollection(collectionName)
  const docsWithTimestamps = documents.map((doc) => ({
    ...doc,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))
  return collection.insertMany(docsWithTimestamps)
}

export async function updateOne(collectionName: string, id: string, update: any) {
  const collection = await getCollection(collectionName)
  return collection.updateOne({ _id: new ObjectId(id) }, { $set: { ...update, updatedAt: new Date() } })
}

export async function deleteOne(collectionName: string, id: string) {
  const collection = await getCollection(collectionName)
  return collection.deleteOne({ _id: new ObjectId(id) })
}

export async function countDocuments(collectionName: string, query = {}) {
  const collection = await getCollection(collectionName)
  return collection.countDocuments(query)
}
