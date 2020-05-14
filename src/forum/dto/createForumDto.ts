import { IsNotEmpty } from "class-validator";

export class CreateForumDTO {
    @IsNotEmpty()
    judul: string

    @IsNotEmpty()
    isi: string;
}