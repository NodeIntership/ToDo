function lookupUser (){
    return [
      {
        $lookup: {
          from: "professions",
          localField: "profession",
          foreignField: "_id",
          as: "profession",
          pipeline: [
            {
              $project: {
                id: "$_id",
                _id: 0,
                title: "$title",
              },
            },
          ],
        },
      },
      {
        $project: {
          id: "$_id",
          _id: false,
          name: true,
          surname: true,
          birthday: true,
          todos: true,
          profession: {
            $cond: {
              if: { $eq: [true, "$professionHidden"] },
              then: "$$REMOVE",
              else: "$profession",
            },
          },
        },
      },
    ];
}

module.exports = {
    lookupUser
}