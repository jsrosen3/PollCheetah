collection @polls
attributes :id, :title
child (:questions) do
  attributes :id, :poll_id, :text
  child (:answers) do
    attributes :id, :question_id, :text
    node(:num_votes) { |answer| answer.votes.length }
  end
end