export default function ProfileByIdPage({ params }: { params: { id: string } }) {
  return <h1>Профиль пользователя {params.id}</h1>
}
