type ArtPieceType = {
    _id: string,
    title: string,
    image_url: string,
    updatedAt: string,
    createdAt: string,
    width: number,
    height: number,
    user_id: UserType,
}

type UserType = {
    _id: string,
    email: string,
    image_of_artist: string,
    name: string
}