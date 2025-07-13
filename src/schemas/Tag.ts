import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const TagPlain = t.Object(
  {
    id: t.String(),
    name: t.String(),
    description: __nullable__(t.String()),
    group: t.Union(
      [
        t.Literal("genre"),
        t.Literal("theme"),
        t.Literal("format"),
        t.Literal("content"),
      ],
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const TagRelations = t.Object({}, { additionalProperties: false });

export const TagPlainInputCreate = t.Object(
  {
    name: t.String(),
    description: t.Optional(__nullable__(t.String())),
    group: t.Union(
      [
        t.Literal("genre"),
        t.Literal("theme"),
        t.Literal("format"),
        t.Literal("content"),
      ],
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const TagPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    description: t.Optional(__nullable__(t.String())),
    group: t.Optional(
      t.Union(
        [
          t.Literal("genre"),
          t.Literal("theme"),
          t.Literal("format"),
          t.Literal("content"),
        ],
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const TagRelationsInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const TagRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: false }),
);

export const TagWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          name: t.String(),
          description: t.String(),
          group: t.Union(
            [
              t.Literal("genre"),
              t.Literal("theme"),
              t.Literal("format"),
              t.Literal("content"),
            ],
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    { $id: "Tag" },
  ),
);

export const TagWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), name: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ name: t.String() })],
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              name: t.String(),
              description: t.String(),
              group: t.Union(
                [
                  t.Literal("genre"),
                  t.Literal("theme"),
                  t.Literal("format"),
                  t.Literal("content"),
                ],
                { additionalProperties: false },
              ),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Tag" },
);

export const TagSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      description: t.Boolean(),
      group: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const TagInclude = t.Partial(
  t.Object(
    { group: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const TagOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      description: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Tag = t.Composite([TagPlain, TagRelations], {
  additionalProperties: false,
});

export const TagInputCreate = t.Composite(
  [TagPlainInputCreate, TagRelationsInputCreate],
  { additionalProperties: false },
);

export const TagInputUpdate = t.Composite(
  [TagPlainInputUpdate, TagRelationsInputUpdate],
  { additionalProperties: false },
);
