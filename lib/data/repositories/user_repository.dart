import 'package:cloud_firestore/cloud_firestore.dart';

class UserRepository {
  final CollectionReference users =
      FirebaseFirestore.instance.collection("users");

  Future<void> saveUser(String uid, Map<String, dynamic> data) async {
    await users.doc(uid).set(data);
  }
}
