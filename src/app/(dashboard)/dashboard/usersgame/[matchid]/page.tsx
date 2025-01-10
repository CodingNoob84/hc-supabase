export default async function UserMatchPage({
    params,
}: {
    params: Promise<{ matchid: string }>
}) {
    const { matchid } = await params
    return <div>Match-{matchid}</div>
}
