import { User } from 'src/modules/users/entities/user.entity';

export const HelperService = {
  buildPayloadResponse(user: User, accessToken: string, refreshToken?: string) {
    return {
      user: {
        id: user.id,
      },
      accessToken,
      refreshToken,
    };
  },
};
