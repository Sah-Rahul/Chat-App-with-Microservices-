import BaseRepository from "./BaseRepository.js";
import User from "../../../shared/models/User.model.js";
import logger from "../../../shared/config/logger.js";

class MongoUserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async create(userData) {
    try {
      let data = { ...userData };

      if (data.role === "super_admin" && !data.permissions) {
        data.permissions = {
          canCreateApiKeys: true,
          canManageUsers: true,
          canViewAnalytics: true,
          canExportData: true,
        };
      }

      const user = new this.model(data);
      await user.save();

      logger.info("User created", { username: user.username });
      return user;
    } catch (error) {
      logger.error("Error creating user", error);
      throw error;
    }
  }

  async findById(userId) {
    return this.model.findById(userId);
  }

  async findByUsername(username) {
    return this.model.findOne({ username });
  }

  async findByEmail(email) {
    return this.model.findOne({ email });
  }

  async findAll() {
    return this.model.find({ isActive: true }).select("-password");
  }
}

export default  MongoUserRepository;
