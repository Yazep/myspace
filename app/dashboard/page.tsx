import { getServerSession } from "next-auth";
import { ProfileForm } from "./ProfileForm";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/buttons";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard(){
    const session = await getServerSession();

    // if (!session) {   redirect('/api/auth/signin')};

    const currentUser = session?.user?.email!;
    const user = prisma.user.findUnique({where:{email:currentUser}})

    return (
        <>
        <h1>Dashboard</h1>
        <SignOutButton/>
        <ProfileForm user={user}/>
        </>
    );
}