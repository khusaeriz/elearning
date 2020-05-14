import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    forumId: number;

    @IsNotEmpty()
    komen: string
}